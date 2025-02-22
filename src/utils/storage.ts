export const setToStorage = (key = "", value: unknown, sessionStorage?: boolean) => {
	if (typeof window !== "undefined") {
		try {
			window[sessionStorage ? "sessionStorage" : "localStorage"].setItem(key, JSON.stringify(value));
		} catch {
			return null;
		}
	}
};

export const getFromStorage = (key = "", sessionStorage?: boolean) => {
	if (typeof window !== "undefined") {
		try {
			const value = window[sessionStorage ? "sessionStorage" : "localStorage"].getItem(key);
			if (value) {
				return JSON.parse(value);
			}
		} catch {
			return null;
		}
	}
};

export const removeFromStorage = (key = "", sessionStorage?: boolean) => {
	if (typeof window !== "undefined") {
		try {
			window[sessionStorage ? "sessionStorage" : "localStorage"].removeItem(key);
		} catch {
			return null;
		}
	}
};
