// Node modules

import { Client, Databases, ID, Query, TablesDB } from 'appwrite'

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

const databases = new Databases(client)

const tablesDS = new TablesDB(client);

export { client, databases, ID, Query, tablesDS }
