import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateSesionDto {
  @IsDateString()
  inicio: string;

  @IsDateString()
  fin: string;

  @IsOptional()
  @IsString()
  notas?: string;

  @IsInt()
  materiaId: number;

  @IsOptional()
  @IsInt()
  actividadId?: number;
}