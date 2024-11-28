import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import ConfigApi from '../Config/ConfigApi'

export const DataContext = createContext()
export default function DataProvider({ children }) {
    const [categories, setCategories] = useState([])
    const [adsData, setAdsData] = useState([])
    const [portfoliosData, setPortfoliosData] = useState([])
    const [articles, setArticles] = useState([])
    const [countries,setCountries] = useState([])
    const [adTypes,setadTypes] = useState([])

    const fetch_categories_data = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/categories`);
            setCategories(response.data.data);
            
        } catch (error) {
            console.log('error fetching categories data', error)
        }
    };


    const fetch_ads_data = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/ads`)
            setAdsData(response.data.data)
        } catch (error) {
            console.log('error fetching ads data', error)
        }
    }

    const fetch_users_portfolio = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/portfolios/data`)
            setPortfoliosData(response.data.data)
            
        } catch (error) {
            console.log('error fetching portfolios data', error)
        }
    }

    const fetch_articles_data = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/articles`)
            setArticles(response.data.data)
        } catch (error) {
            console.log('error fetching articles data', error)
        }
    }


    const fetch_contries_data = async ()=>{
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/countries`)
            setCountries(response.data.data)
        } catch (error) {
            console.log('error fetching countries data', error)
        }
    }

    const fetch_adsTypes_data = async () => {
        try {
            const response = await axios.get(`${ConfigApi.API_URL}/api/show/adtypes`) 
            setadTypes(response.data.data) 
        } catch (error) {
            console.log('error fetching adtypes data', error)
        }
    }

    
    useEffect(() => {
        fetch_categories_data();
        fetch_ads_data()
        fetch_contries_data()
        fetch_adsTypes_data()
        fetch_articles_data();
    }, [])


    
    return (
        <DataContext.Provider value={
            [
            categories, 
            fetch_categories_data, 
            adsData, 
            fetch_ads_data,
            portfoliosData,
            fetch_users_portfolio,
            countries,
            fetch_contries_data,
            adTypes,
            fetch_adsTypes_data,
            articles,
            fetch_articles_data]
            }>
            {children}
        </DataContext.Provider>
    )
}
