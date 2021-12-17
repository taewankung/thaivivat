import {Entity, PrimaryGeneratedColumn, Column, Unique} from "typeorm";
@Entity()
@Unique("UNIQUE_TICKET", ["plateNumber"])
class Ticket {
    @PrimaryGeneratedColumn()
    id

    @Column("varchar", {"name": "plateNumber", "length":255})
    plateNumber

    @Column("text", {"name": "size"})
    size

    @Column("integer", {"name": "allocatedParkSlot"})
    allocatedParkSlot

}
export default Ticket