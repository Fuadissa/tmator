"use client";

import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
} from "react";

interface AppState {
  createappData: {
    appName?: string;
    appDomain?: string;
    appImage?: string;
    appDescription?: string;
    botUrl?: string;
    userId?: string;
    tg_id?: string;
    templateUrl?: string;
    templateType?: string;
  };
  userData: {
    tg_id?: string;
    _id?: string;
    username?: string;
    profilePicture?: string;
    premium?: boolean;
    first_name?: string;
    last_name?: string;
    auth_date?: number;
    createdAt?: number;
    [key: string]: unknown;
    // Include other fields returned by Telegram as needed
  };
  appData: {
    mediaUrl?: string;
    content?: string;
    title?: string;
    category?: string;
    videoUrl?: string;
    imageUrl?: string;
  };
}

type Action =
  | {
      type: "CREATE_APP_DATA";
      payload: {
        appName?: string;
        appDomain?: string;
        appImage?: string;
        appDescription?: string;
        botUrl?: string;
        userId?: string;
        tg_id?: string;
        templateUrl?: string;
        templateType?: string;
      };
    }
  | { type: "SET_USER_DATA"; payload: Partial<AppState["userData"]> }
  | { type: "NEW_APP_DATA"; payload: Partial<AppState["appData"]> }
  | { type: "SET_PASTE_URL"; payload: string }
  | { type: "SEND_DATA" };

const initialState: AppState = {
  createappData: {},
  userData: {
    premium: false,
  },
  appData: {},
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "CREATE_APP_DATA":
      return {
        ...state,
        createappData: { ...state.createappData, ...action.payload },
      };
    case "NEW_APP_DATA":
      return {
        ...state,
        appData: { ...state.appData, ...action.payload },
      };
    case "SET_USER_DATA":
      return { ...state, userData: { ...state.userData, ...action.payload } };
    // case "SET_PASTE_URL":
    //   return { ...state, pasteUrl: action.payload };
    default:
      return state;
  }
}

// Define context and provider
const AppContext = createContext<
  | {
      state: AppState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState, () => {
    if (typeof window !== "undefined") {
      const localState = localStorage.getItem("appState");
      return localState ? JSON.parse(localState) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
}
