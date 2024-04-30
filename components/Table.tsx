import React from "react";
import { ReactNode } from "react";

export default function Table({ thead, tbody }: TableProps) {
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="w-full text-left text-sm font-light">
                            {thead}
                            <tbody>{tbody}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

type TableProps = {
    thead: ReactNode;
    tbody?: ReactNode;
};