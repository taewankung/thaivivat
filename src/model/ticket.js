import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToOne, JoinColumn} from "typeorm";
import SlotParkingIot from "./slotParkingIot";
@Entity()

class Ticket {
    @PrimaryGeneratedColumn()
    id

    @Column("varchar", {"name": "plateNumber", "length":255})
    plateNumber

    @Column("text", {"name": "size"})
    size

    @OneToOne(() => SlotParkingIot)
    @JoinColumn()
    allocatedParkSlot

}
export default Ticket