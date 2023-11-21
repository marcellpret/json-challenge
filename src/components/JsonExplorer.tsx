import type { jsonData } from "../types";
import { useEffect, useState, useRef, div } from "react";

export default function JsonExplorer({ res }: { res: jsonData }) {
    const [property, setProperty] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const inputProperty = useRef<HTMLInputElement>(null);

    const handleInputChange = (path: string) => {
        const transformedString = path.replace(/\.(\d+)/g, "[$1]");
        setProperty(transformedString);
    };

    useEffect(() => {
        inputProperty.current?.focus();

        const handleValue = (path: string) => {
            const originalPath = path.replace(/\[(\d+)\]/g, ".$1");
            const splittedPath = originalPath.split(".");
            const nestedProperties = splittedPath.splice(1);

            if (!originalPath.startsWith("res.")) return;

            const value = nestedProperties.reduce((acc: any, key: string) => {
                console.log(acc, key);
                return acc && Object.prototype.hasOwnProperty.call(acc, key)
                    ? acc[key as keyof jsonData]
                    : undefined;
            }, res);

            console.log("VALUE: ", value);

            if (
                Array.isArray(value) ||
                (typeof value === "object" && value !== null)
            ) {
                setValue("undefined");
                return;
            }

            setValue(typeof value === "string" ? value : JSON.stringify(value));
        };

        handleValue(property);
    }, [property, res]);

    const renderJsonValue = (key: string, value: string, path: string) => {
        if (typeof value === "object" && value !== null) {
            if (Array.isArray(value)) {
                return (
                    <div key={key} className="array-class">
                        <span>{key}: [</span>
                        <div>
                            {Object.entries(value).map(([subKey, subValue]) =>
                                renderJsonValue(
                                    subKey,
                                    subValue,
                                    `${path}.${subKey}`
                                )
                            )}
                            {"]"}
                        </div>
                    </div>
                );
            } else {
                return (
                    <div key={key} className="object-class">
                        <div>
                            {key ? "{" : ""}
                            {Object.entries(value).map(([subKey, subValue]) =>
                                renderJsonValue(
                                    subKey,
                                    subValue,
                                    `${path}.${subKey}`
                                )
                            )}
                            {key ? "}," : ""}
                        </div>
                    </div>
                );
            }
        } else {
            return (
                <div key={key} className="property-class">
                    <span onClick={() => handleInputChange(path)}>{key}:</span>
                    {JSON.stringify(value)}
                </div>
            );
        }
    };

    return (
        <div>
            <h1>JSON Explorer</h1>
            <div className="input-fields">
                <div>
                    <label htmlFor="property">Property</label>
                    <input
                        type="text"
                        id="property"
                        name="property"
                        placeholder="Property"
                        onChange={(e) => handleInputChange(e.target.value)}
                        value={property}
                        ref={inputProperty}
                    />
                    <span>→</span>
                </div>
                <div>
                    <label htmlFor="variable">Block / Variable</label>
                    <input
                        type="text"
                        id="variable"
                        name="variable"
                        placeholder="Variable"
                    />
                    <span>–</span>
                </div>
            </div>

            <p>{value || "undefined"}</p>
            <div>
                <h2>Response</h2>
                <div className="response-container">
                    {renderJsonValue("", res, "res")}
                </div>
            </div>
        </div>
    );
}
