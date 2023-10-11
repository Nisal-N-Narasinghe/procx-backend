import { IsString, IsBoolean, IsNotEmpty, ValidateIf } from 'class-validator';

export class UpdateTodoDto {
  @ValidateIf(
    (obj) => !obj.hasOwnProperty('title') && !obj.hasOwnProperty('done'),
  )
  isEmptyRequest?: boolean;

  @ValidateIf((obj) => obj.hasOwnProperty('title'))
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title?: string;

  @ValidateIf((obj) => obj.hasOwnProperty('done'))
  @IsBoolean()
  done?: boolean;
}
