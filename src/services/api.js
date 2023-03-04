import axios from "axios";


export const fetchImages = async ({ inputValue, page }) => {
    const response = await axios.get('https://pixabay.com/api/', {
        params: {
            key: "31759222-00acf71bf0a65e43bd085eba1",
            q: `${inputValue}`,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            page: `${page}`,
            per_page: 12,
        }
    });

    return {
        hits: response.data.hits,
        total: response.data.totalHits
    }
}