import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Actividad } from '../../actividades/entities/actividad.entity';
import { Sesion } from '../../sesiones/entities/sesion.entity';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100, nullable: true })
  docente?: string;

  @Column({ type: 'int', default: 0 })
  metaHorasSemanales: number;

  @OneToMany(() => Actividad, (a) => a.materia)
  actividades: Actividad[];

  @OneToMany(() => Sesion, (s) => s.materia)
  sesiones: Sesion[];
}