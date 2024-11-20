import axios from "axios";

const apiUrl = "http://localhost:8085/banque/comptes";

export const getAccounts = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
};

export const addAccount = async (account) => {
    await axios.post(apiUrl, account);
};

export const updateAccount = async (id, account) => {
    await axios.put(`${apiUrl}/${id}`, account);
};

export const deleteAccount = async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
};
