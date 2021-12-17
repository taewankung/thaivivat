import { Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
@Entity("parkingIot")
@Unique("uniqueName", ["name"])
class ParkingIot {
    @PrimaryGeneratedColumn()
    id

    @Column("text", {"name": "name"})
    name

    @Column("text", {"name": "status", "default":"empty"})
    status

}
export default ParkingIot;