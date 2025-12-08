import { Client, Databases, Query, ID } from "appwrite";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;

export const updateSearchCounter = async (searchTerm, movie) => {
    const client = new Client()
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject(PROJECT_ID);

    const databases = new Databases(client);

    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            TABLE_ID,
            [Query.equal("searchTerm", searchTerm)]
        );

        // Check if any matching record exists
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await databases.updateDocument(
                DATABASE_ID,
                TABLE_ID,
                doc.$id,
                {
                    count: doc.count + 1,
                }
            );
        } else {
            await databases.createDocument(
                DATABASE_ID,
                TABLE_ID,
                ID.unique(),
                {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }
            );
        }
    } catch (error) {
        console.error("Error updating search counter:", error);
    }
};
