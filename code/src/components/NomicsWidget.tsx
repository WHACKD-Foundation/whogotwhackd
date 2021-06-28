import React from 'react'

export function NomicsWidget() {
    const script = document.createElement("script");
    script.src = "https://widget.nomics.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return (
    <div className="nomics-ticker-widget" data-name="Whackd" data-base="WHACKD" data-quote="USD"></div>
)}