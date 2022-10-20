import { HttpClient } from "@angular/common/http";
import { DataService } from "./data.service";
import { LoggerService } from "./logger.service";

export function dataServiceFactory(logger: LoggerService, http: HttpClient){
    let dataService: DataService = new DataService(logger, http);

    logger.log('Creating a new data service with a factory function.');

    return dataService;
}