import React from "react";
import brain from "../assets/brain.png"

const Logo: React.FC = () => {
    return (
        <div className="flex justify-center mb-4">
            <img
                src={brain}
                alt="Brain Icon"
                className="w-16 h-16"
            />
        </div>
    )
}

export default Logo