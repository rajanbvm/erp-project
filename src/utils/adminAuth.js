export const getCurrentUser = () => {
    if (typeof window === "undefined") return null;

    const currentUser =
        localStorage.getItem("currentUser");

    if (!currentUser) return null;

    try {
        return JSON.parse(currentUser);
    } catch (error) {
        localStorage.removeItem("currentUser");
        return null;
    }
};