import React from "react";

export interface myPalette {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
    // Add more color properties as needed
};

export type MyContextValue = {
    theme?: string;
    palette?: myPalette;
     // Add more values as needed
};

// it will use inside the app that useMyContext called
export type MyContextType = {
    context: MyContextValue;
    setContext: React.Dispatch<React.SetStateAction<MyContextValue>>;
};

export const MyContext = React.createContext<MyContextType | null>(null);

// cusstom hook to use provided context
export const useMyContext = (): MyContextType => {
    const context = React.useContext(MyContext);
    if(!context){
        throw new Error("useMyContext must be used within the MyContexProvider");
    }
    return context;
}

type MyContextProps = {
    initContextValue: MyContextValue;
    children: React.ReactNode;
};

const MyProvider = ({initContextValue, children}: MyContextProps) => {
    const [context, setContext] = React.useState<MyContextValue>(initContextValue);

    const value: MyContextType = {
        context,
        setContext,
    };

    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    );
};

export default MyProvider;