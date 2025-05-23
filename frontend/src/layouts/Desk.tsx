import React from "react";
import type { Card } from "../../types/index.ts"
import { ActionButton, PageHeader } from '../components/index.ts';
import useManualFetch from "../hook/useManualFetch.tsx";
import { LocalesContext } from "../main.tsx";
import { apiEndPoints, getRandomItems, getSessionToken, getTodayItems } from "../consts/index.ts";
import { useParams } from "react-router";


const Desk: React.FC = () => {
    const { id } = useParams();

    const locales = React.useContext(LocalesContext);
    const [type, setType] = React.useState<"interval" | "random" | "">("");
    const [currentCount, setCurrentCount] = React.useState<number>(0);
    const [currentCards, setCurrentCards] = React.useState<Record<"interval" | "random", Card[]>>({ interval: [], random: [] });

    const { response, fetchData } = useManualFetch<Card[]>();
    const { response: responseUpdated, fetchData: fetchDataUpdated } = useManualFetch<Card>();

    const fetchCards = async () => {
        const endPoint = apiEndPoints().card.all(id as string);
        const token = getSessionToken();
        await fetchData(endPoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    };


    const handleChangeType = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = event.currentTarget;
        setType(name === "interval" || name === "random" ? name : "");
        setCurrentCount(0);
    }

    const handleChangeCount = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { name } = event.currentTarget;
        const cards = currentCards["random"];
        const maxIndex = Math.min(cards.length, 10) - 1;

        setCurrentCount(prev => {
            if (name === "next") return prev >= maxIndex ? 0 : prev + 1;
            if (name === "prev") return prev <= 0 ? maxIndex : prev - 1;
            return prev;
        });
    };

    const handleSave = async (event: React.MouseEvent<HTMLButtonElement>, card: Card) => {
        const { name } = event.currentTarget;
        let { easeFactor, interval, repetitions, answer, question } = card;

        switch (name) {
            case 'again':
                interval = 1;
                repetitions = 0;
                easeFactor = Math.max(1.3, easeFactor - 0.2);
                break;
            case 'good':
                interval = interval * easeFactor;
                repetitions += 1;
                break;
            case 'easy':
                interval = interval * easeFactor * 1.3;
                easeFactor = easeFactor + 0.1;
                repetitions += 1;
                break;
        }

        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + Math.round(interval));

        const endPoint = apiEndPoints().card.update(card.id);
        const token = getSessionToken();

        await fetchDataUpdated(endPoint,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ answer, question, easeFactor, interval, repetitions, dueDate })
            }
        )
    };


    React.useEffect(() => {
        if (type === "") fetchCards();
    }, [type]);

    React.useEffect(() => {
        if (response?.data) {
            const cards = response.data;
            setCurrentCards({
                interval: getTodayItems<Card>(cards, "dueDate"),
                random: getRandomItems(cards, 10),
            });
        }
    }, [response]);

    React.useEffect(() => {
        if (responseUpdated?.data) setCurrentCount(prev => prev + 1);
    }, [responseUpdated]);


    return (
        <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
                <PageHeader title='desk' />
                {
                    type !== ""
                        ? <>
                            {
                                currentCards[type][currentCount] &&
                                <div className="mt-4">
                                    <p className="text-gray-500 dark:text-gray-400">Card {currentCount + 1} of {currentCards[type].length}</p>
                                </div>
                            }


                            {currentCards[type][currentCount]
                                ? <CardItem
                                    card={currentCards[type][currentCount]}
                                    type={type}
                                    onCount={handleChangeCount}
                                    onSave={handleSave}
                                    t={locales.t}
                                />
                                :
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md text-center">
                                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                                        {locales.t("list_desk_form_succses_heading")}
                                    </h2>
                                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                        {locales.t("list_desk_form_succses_text")}
                                    </p>
                                </div>
                            }

                            <div className="space-y-2">
                                <ActionButton name="back" classList="secondary" onClick={handleChangeType}>{locales.t("list_desk_form_back")}</ActionButton>
                            </div>
                        </>
                        : <>

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-black dark:text-white">{locales.t("list_desk_form_type")}</h2>
                                <div className="space-y-2">
                                    <ActionButton name="interval" classList="primary" onClick={handleChangeType}>{locales.t("list_desk_form_interval")}</ActionButton>
                                    <ActionButton name="random" classList="secondary" onClick={handleChangeType}>{locales.t("list_desk_form_random")}</ActionButton>
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Desk


type CardItemProps = {
    card: Card,
    t: (key: string) => string,
    onCount: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onSave: (event: React.MouseEvent<HTMLButtonElement>, card: Card) => void,
    type: "interval" | "random"
}


const CardItem: React.FC<CardItemProps> = ({ card, type, onCount, t, onSave }) => {
    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

    const handleToggle = () => {
        setShowAnswer(prev => !prev)
    }

    React.useEffect(() => {
        if (showAnswer) {
            setShowAnswer(false)
        }
    }, [card])

    return (
        <div className="flex flex-col gap-y-4 mt-3">
            <div className="bg-blue-50 dark:bg-gray-700 rounded-lg p-6 min-h-[150px] flex items-center justify-center">
                <p className="text-2xl font-bold text-black dark:text-white text-center">
                    {!showAnswer ? card.question : card.answer}
                </p>
            </div>

            {card.hint && (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                        {t("list_desk_form_hint")}
                    </h3>
                    <p className="text-base text-black dark:text-white">{card.hint}</p>
                </div>
            )}

            <div className="space-y-3 mb-3">
                <button
                    onClick={handleToggle}
                    className="w-full bg-blue-500 dark:bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
                >
                    {showAnswer ? t("list_desk_form_hide") : t("list_desk_form_show")}
                </button>

                {
                    type === "random"
                        ? <>
                            <ActionButton
                                onClick={onCount}
                                name="next"
                                classList="primary"
                            >
                                {t("list_desk_form_next")}
                            </ActionButton>

                            <ActionButton
                                onClick={onCount}
                                name="prev"
                                classList="primary"
                            >
                                {t("list_desk_form_prev")}
                            </ActionButton>
                        </>
                        :
                        <div className="flex space-x-2">
                            <ActionButton
                                onClick={(event) => onSave(event, card)}
                                name="again"
                                classList="secondary"
                            >
                                {t("list_desk_form_again")}
                            </ActionButton>
                            <ActionButton
                                onClick={(event) => onSave(event, card)}
                                name="good"
                                classList="secondary"
                            >
                                {t("list_desk_form_good")}
                            </ActionButton>
                            <ActionButton
                                onClick={(event) => onSave(event, card)}
                                name="easy"
                                classList="secondary"
                            >
                                {t("list_desk_form_easy")}
                            </ActionButton>
                        </div>
                }

            </div>
        </div>
    )
}