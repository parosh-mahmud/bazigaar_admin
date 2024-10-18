import { Fragment, useEffect, useState } from "react";
import AnimatedNumber from "react-awesome-animated-number";
import "react-awesome-animated-number/dist/index.css";

const Counters = ({ totalValue, duration1 }) => {
    console.log(totalValue);
    // Initialize the state for each AnimatedNumber with the corresponding digit
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [number3, setNumber3] = useState(0);
    const [number4, setNumber4] = useState(0);
    const [number5, setNumber5] = useState(0);
    const [number6, setNumber6] = useState(0);
    const [number7, setNumber7] = useState(0);

    const [hasComma, setHasComma] = useState(false);
    const [size, setSize] = useState(24);
    const [duration, setDuration] = useState(10 * 1000);

    useEffect(() => {
        setDuration(duration1 * 1000);
    }, [duration1]);

    useEffect(() => {
        if (typeof totalValue === "string" && totalValue.length === 14) {
            setNumber1(parseInt(totalValue.slice(0, 2), 10));
            setNumber2(parseInt(totalValue.slice(2, 4), 10));
            setNumber3(parseInt(totalValue.slice(4, 6), 10));
            setNumber4(parseInt(totalValue.slice(6, 8), 10));
            setNumber5(parseInt(totalValue.slice(8, 10), 10));
            setNumber6(parseInt(totalValue.slice(10, 12), 10));
            setNumber7(parseInt(totalValue.slice(12, 14), 10));
        }
    }, [totalValue]);

    return (
        <Fragment>
            <div className="w-fit">
                <div
                    style={{
                        background:
                            "linear-gradient(180deg, #3F3D39 0%, #2D2D2D 100%)",
                        borderRadius: "4px",
                        border: "10px solid #111",
                    }}
                    className="w-fit px-[20px] py-[24px] shadow-inner"
                >
                    <div className="flex items-center justify-start gap-[10px] rounded-md bg-stone-300 px-[10px] py-[20px] shadow-rollingShadow">
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number1}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"desc"}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number2}
                                hasComma={hasComma}
                                size={size}
                                order={"asc"}
                                duration={duration}
                                minDigits={2}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number3}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"desc"}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number4}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"asc"}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number5}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"desc"}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number6}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"asc"}
                            />
                        </div>
                        <div className="text-2xl font-medium leading-[33.60px] text-black">
                            <AnimatedNumber
                                value={number7}
                                hasComma={hasComma}
                                size={size}
                                duration={duration}
                                minDigits={2}
                                order={"desc"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Counters;
