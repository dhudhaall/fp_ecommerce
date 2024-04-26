import { Brand } from "./dropdowns";

export interface Filters{
    brand: Brand[],
    part_categories:Part_Categories[],
    sub_categories:Sub_Categories[],
    vehicle_systems:Vehicle_Systems[],
    sub_systems:Sub_Systems[],
}

export interface Part_Categories{
    part_category_id: string;
    part_category_name: string;
}
export interface Sub_Categories{
    sub_category_id: string;
    sub_category_name: string;
}
export interface Vehicle_Systems{
    vehicle_system_id: string;
    vehicle_system_name: string;
}
export interface Sub_Systems{
    sub_system_id: string;
    sub_system_name: string;
}