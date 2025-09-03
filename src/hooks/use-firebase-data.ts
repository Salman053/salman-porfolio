"use client"

import { db } from "@/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useState, useEffect } from "react"

export const useFirestoreData = () => {
    const [feedbacks, setFeedbacks] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {

        const fetchData = () => {
            setLoading(true)
            setError(null)

            //   const uid = userId

            //   if (!uid) return

            const handleSnapshot = (colName: string, setState: (data: any[]) => void) => {
                const q = collection(db, colName)
                return onSnapshot(
                    q,
                    (snapshot) => {
                        const data = snapshot.docs
                            .map((doc) => ({
                                id: doc.id,
                                docId: doc.id,
                                ...doc.data(),
                            }))
                            .sort((a: any, b: any) => {
                                const aTime = a.createdAt?.seconds ?? 0
                                const bTime = b.createdAt?.seconds ?? 0
                                return bTime - aTime // newest first
                            })
                        setState(data)
                    },
                    handleError,
                )
            }

            const unsubscribeFeedbacks = handleSnapshot("portfolio-feedback", setFeedbacks)

            setLoading(false)

            return () => {
                unsubscribeFeedbacks?.()
            }
        }

       
            fetchData()
        
    }, [])

    const handleError = (error: any) => {
        console.error("Error fetching data:", error)
        setError("Failed to fetch data.")
        setLoading(false)
    }

    return {

        loading,
        error,
        feedbacks
    }
}
