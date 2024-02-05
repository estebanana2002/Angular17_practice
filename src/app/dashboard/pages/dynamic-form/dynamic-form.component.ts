import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DynamicFormComponent {

  private fb = inject(FormBuilder);
  public playlist!: FormGroup;
  public newSong: FormControl = new FormControl('', Validators.required);

  constructor() {
    this.playlist = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      songs: this.fb.array([
        ['La people', Validators.required],
        ['Gavilan II', Validators.required],
        ['Carnal', Validators.required],
      ]),
    });
  }

  public get favoriteSongs() {
    return this.playlist.get('songs') as FormArray;
  }

  public addNewSong() {
    if (this.newSong.invalid ) return;
    const song = this.newSong.value;
    this.favoriteSongs.push(
      this.fb.control(song, Validators.required)
    );
    this.newSong.reset();
  }

  public saveForm() { 

  }

  public validateController(inputField: string) {
    return this.playlist.controls[inputField].errors
    && this.playlist.controls[inputField].touched;
  }

  public isValidInArray(formArray: any, index: number) {
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  public deleteFromArray(index: number) {
    this.favoriteSongs.removeAt(index);
  }

  public getFieldError(field: string) {
    const input = this.playlist.controls[field];
    if ( input ) {
      const errors = input.errors || [];

      for ( const key of Object.keys( errors) ) {
        switch (key) {
          case 'required':
            return 'Este campo es requerido!';
          case 'minlength':
            return 'El campo debe tener mas de 5 caracteres!';
          default:
            return;
        }
      }
    }
    return;
  }
}
