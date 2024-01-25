import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
