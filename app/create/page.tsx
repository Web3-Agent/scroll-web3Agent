import React from "react";
import { Suspense } from "react";
import Create from "../_components/Create";

export default function Page() {
    return (
        <Suspense>
            <Create />
        </Suspense>
    );
}