import { Entity, PrimaryGeneratedColumn, Column, Unique, BeforeInsert} from "typeorm";

@Entity("parkingIot")
@Unique("UNIQUE_PARKING_IOT", ["mac"])
class ParkingIot {
    @PrimaryGeneratedColumn()
    id

    @Column("char", {"name": "name", length: 255})
    name

    @Column("text")
    status="EMPTY"

    @Column("varchar", {length: 30})
    mac
}
export default ParkingIot;