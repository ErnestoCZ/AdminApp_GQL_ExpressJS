import AppDataSource from "./DataSource";

export const initAppDataSource = async () => {
    await AppDataSource.initialize();
}