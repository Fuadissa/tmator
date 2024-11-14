"use client";

import NewsAppContent from "@/templates/NewsMiniApp/NewsAppContent/page";
import NewsAppHome from "@/templates/NewsMiniApp/NewsAppHome/page";
import axios from "axios";
import React, { use, useEffect, useState } from "react";

interface MiniApp {
  appName?: string;
  appDomain?: string;
  appImage?: string;
  appDescription?: string;
  botUrl?: string;
  userId?: string;
  tg_id?: string;
  templateUrl?: string;
  templateType?: string;
  _id?: string;
  createrdAt?: string;
  updateddAt?: string;
}

interface AppData {
  _id?: string;
  mediaUrl?: string;
  content?: string;
  title?: string;
  category?: string;
  videoUrl?: string;
  imageUrl?: string;
  userId?: string;
  tg_id?: string;
  createdAt?: string;
  updatedAt?: string;
}

const MiniAppScreen = ({
  params,
}: {
  params: Promise<{ miniAppSlug: string[] }>;
}) => {
  const { miniAppSlug } = use(params);
  const [checkAppAvailability, setCheckAppAvailability] = useState(false);
  const [miniApp, setMiniApp] = useState<MiniApp | null>(null);
  const [appData, setAppData] = useState<AppData[]>([]);

  const [appOneData, setAppOneData] = useState<AppData>({});

  useEffect(() => {
    const fetchMiniApp = async () => {
      try {
        const response = await axios.get(
          `/api/miniapp/getminiapp?appDomain=${miniAppSlug[0]}`
        );
        const data = response.data;

        if (data.status) {
          setCheckAppAvailability(true);
          setMiniApp(data.miniApp);
        } else {
          console.log("Failed to fetch mini app");
        }
      } catch (error) {
        console.error("Error fetching mini app:", error);
      }
    };

    if (miniAppSlug.length > 0) {
      fetchMiniApp();
    }
  }, [miniAppSlug]);

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        if (!miniApp?._id) return;
        const response = await axios.get(`/api/appdata?appId=${miniApp._id}`);
        const data = response.data;

        if (data.status) {
          console.log(data);
          setAppData(data.appData);
        }
      } catch (error) {
        console.error("Error fetching app data:", error);
      }
    };

    if (checkAppAvailability && miniApp?._id && miniAppSlug.length === 1) {
      fetchAppData();
    }
  }, [checkAppAvailability, miniApp, miniAppSlug]);

  useEffect(() => {
    const fetchOneAppData = async () => {
      try {
        const { data } = await axios.get(
          `/api/appdata/getdata?appDataId=${miniAppSlug[1]}`
        );

        if (data.status) {
          console.log(data);
          setAppOneData(data.appData);
        } else {
          console.log("Failed to fetch one app data");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (miniAppSlug.length === 2) {
      fetchOneAppData();
    }
  }, [miniAppSlug]);

  return (
    <div>
      {miniAppSlug.length === 1 ? (
        <NewsAppHome appData={appData} miniApp={miniApp || {}} />
      ) : miniAppSlug.length === 2 ? (
        <NewsAppContent miniApp={miniApp || {}} appOneData={appOneData} />
      ) : (
        ""
      )}
      {/* Render additional components as needed */}
    </div>
  );
};

export default MiniAppScreen;
