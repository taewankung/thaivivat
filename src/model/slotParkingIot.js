import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, JoinColumn} from "typeorm";
import ParkingIot from "./parking";

@Entity()
class SlotParkingIot {
    @PrimaryGeneratedColumn()
    id

    @Column("text", {"name": "slot"})
    slot

    @Column("text", {"name": "size"})
    size

    @OneToOne(() => ParkingIot)
    @JoinColumn()
    parkingIot
}
export default SlotParkingIot;