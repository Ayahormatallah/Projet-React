import React from "react";
import axios from "axios";

const apiUrl = "http://localhost:8085/banque/comptes";

const AccountViewer = () => {
    const fetchAccounts = async (format) => {
        try {
            const response = await axios.get(apiUrl, {
                headers: { Accept: format === "json" ? "application/json" : "application/xml" },
            });
            console.log(`Réponse en ${format.toUpperCase()} :`, response.data);
        } catch (error) {
            console.error(`Erreur lors de la récupération des données (${format}):`, error);
        }
    };

    return (
        <div>
            <h2>Visualiser les Comptes</h2>
            <button onClick={() => fetchAccounts("json")}>
                Voir les comptes en JSON
            </button>
            <button onClick={() => fetchAccounts("xml")}>
                Voir les comptes en XML
            </button>
        </div>
    );
};

export default AccountViewer;
