import { IsDateString, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { EstadoActividad } from '../entities/actividad.entity';

export class CreateActividadDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  titulo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsDateString()
  fechaEntrega: string;

  @IsOptional()
  @IsEnum(EstadoActividad)
  estado?: EstadoActividad;

  @IsInt()
  materiaId: number;
}