import { ConnectOptions, Connection, connect, set } from "mongoose";

export default class MongooseDBConnection {
    private static _instance: MongooseDBConnection;

    private readonly mongoUrl: string;
    private connection: Connection | undefined;

    private constructor(mongoUrl: string) {
        this.mongoUrl = mongoUrl;
    }

    public async getConnection(options?: ConnectOptions): Promise<Connection> {
        if (!this.connection) {
            this.connection = await this.connect(options);
        }

        return this.connection;
    }

    public async closeConnection(): Promise<void> {
        return this.connection?.close();
    }

    private async connect(options: ConnectOptions = {}): Promise<Connection> {
        set("strictQuery", false);

        const { connection } = await connect(
            this.mongoUrl,
            {
                autoCreate: true,
                autoIndex: true,
                ...options,
            },
        );

        connection.on(
            "error",
            console.error.bind(
                console,
                "MongoDB connection error:",
            ),
        );

        return connection;
    }

    public static getInstance(mongoUrl: string): MongooseDBConnection {
        if (!MongooseDBConnection._instance) {
            MongooseDBConnection._instance = new MongooseDBConnection(mongoUrl);
        }

        return MongooseDBConnection._instance;
    }
}
