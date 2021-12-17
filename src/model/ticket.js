import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
@Entity()
class Ticket {
    @PrimaryGeneratedColumn()
    id

    @Column("text", {"name": "plateNumber"})
    plateNumber

    @Column("text", {"name": "size"})
    size

    @Column("text", {"name": "alocatedParkSlot"})
    alocatedParkSlot

}
export default Ticket