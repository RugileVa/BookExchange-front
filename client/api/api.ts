export * from './advertController.service';
import { AdvertControllerService } from './advertController.service';
export * from './personsController.service';
import { PersonsControllerService } from './personsController.service';
export const APIS = [AdvertControllerService, PersonsControllerService];
