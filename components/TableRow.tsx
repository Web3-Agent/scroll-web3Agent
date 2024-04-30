import React from "react";
import { ReactNode } from "react";

export default function TableRow({ children }: TableRow) {
    return (
        <tr className="border-b border-neutral-200 text-gray-800">
            {children}
        </tr>
    );
}
type TableRow = {
    children: ReactNode;
};