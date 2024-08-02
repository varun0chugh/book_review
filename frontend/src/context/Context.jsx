import { createContext, useState } from "react";

const BookReviewsContext = createContext()

const BookReviewsContextProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState({})

    return (
        <BookReviewsContext.Provider
            value={{ loggedInUser, setLoggedInUser }}
        >
            {props.children}
        </BookReviewsContext.Provider>
    )
}

export { BookReviewsContextProvider, BookReviewsContext };