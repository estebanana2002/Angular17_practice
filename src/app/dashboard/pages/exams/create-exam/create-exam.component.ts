import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Answer, Question } from '../../../../interfaces/Exam';
import { TooltipDirective } from '../../../../core/Directives/Tooltip.directive';

@Component({
  selector: 'app-create-exam',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TooltipDirective
  ],
  templateUrl: './create-exam.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateExamComponent {
  Groups: string[] = [
    'DGS-',
    'DN-',
    'MT-',
    'GST-',
  ];
  Subjects: string[] = [
    'Ingles',
    'Matematicas',
    'Science',
    'Desarrollo web'
  ];

  public examForm!: FormGroup;
  public question: FormControl = new FormControl('¿Cuantos tipos de tacos existen en mexico?', Validators.required);
  public answer: FormControl = new FormControl('', Validators.required);
  public description: FormControl = new FormControl('', Validators.required);

  public answers: any;

  constructor(
    private fb: FormBuilder,
  ) {
    this.answers = this.fb.array([]);
    this.examForm = fb.group({
      group: ['801', [Validators.required, Validators.pattern(/^.+-\d+$/)]],
      subject: ['', [Validators.required]],
      title: ['Formularios reactivos', [Validators.required]],
      teacher: ['Erick Corro Pacheco', [Validators.required, Validators.pattern(/^(Ing|Lic|MDG)\s.+$/)]],
      description: this.fb.array([
        ['Examen parcial 1 de desarrollo web profesional', Validators.required],
        ['Elaborar una pagina con un grid aca bien perro que hable sobre pozoles rojos y verdes', Validators.required],
      ]),
      date: [new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      duration: ['', [Validators.required]],
      questions: this.fb.array([
        [{
          question: '¿Cuantos dedos tiene un cuyo?',
          points: 8,
          answer: [
            { answer: '4', correct: false },
            { answer: '9', correct: false },
            { answer: '15', correct: true },
          ],
        }],
        [{
          question: '¿De donde es luis Miguel "el sol de mexico"?',
          points: 8,
          answer: [
            { answer: 'Mexico', correct: false },
            { answer: 'Colombia', correct: false },
            { answer: 'puerto rico', correct: true },
            { answer: 'Ninguna de las anteriores', correct: false },
          ],
        }],
        [{
            question: '¿De dónde son los cuyos?',
            points: 8,
            answer: [
              {answer: 'Guatemala', correct: false},
              {answer: 'México',correct: false},
              {answer: 'Venezuela',correct: false},
              {answer: 'Ninguna de las anteriores', correct: true}
            ],
          }],
      ]),
    });
    console.log(this.examForm.value);
  }
  public asingTitulo(event: any) {
    const titulo = event.target.value;
    console.log(titulo);

    const input = this.examForm.get('teacher')?.value;

    if (!input.includes('Lic') && !input.includes('Ing') && !input.includes('MDG')) {
      this.examForm.get('teacher')?.reset(titulo + ' ' + input);
    } else {
      const nuevoTexto = input.replace(/Lic|Ing|MDG/g, titulo);
      this.examForm.get('teacher')?.reset(nuevoTexto);
    }

    console.log(this.examForm.get('teacher')?.value);
  }
  public asignGrupo(event: any) {
    const grupo = event.target.value;
    const input = this.examForm.get('group')?.value;

    if (!input.includes('-')) {
      this.examForm.get('group')?.reset(grupo + input);
    } else {
      const numeroGrupo = input.match(/\d+$/)?.[0] || ''; // Extraer el número del grupo
      const nuevoTexto = grupo.endsWith('-') ? grupo + numeroGrupo : grupo + '-' + numeroGrupo;
      this.examForm.get('group')?.reset(nuevoTexto);
    }
  }

  public get getQuestions() {
    return this.examForm.get('questions') as FormArray;
  }
  public get getAnswers() {
    return this.answers as FormArray;
  }
  public get getDescriptons() {
    return this.examForm.get('description') as FormArray;
  }

  public addQuestion() {
    if ( this.question.invalid ) return;
    console.log(this.getAnswers.value);
    const answer = this.getAnswers.value;
    const question = {
      question: this.question.value,
      answer: [...answer],
    };
    this.getQuestions.push(
      this.fb.control(question, Validators.required)
    );
    this.getAnswers.clear();
    console.log(this.examForm.value, 'examenForm');

    this.question.reset();
  }

  public deleteQuestion(index: number) {
    this.getQuestions.removeAt(index);
  }

  public addAnswer( ) {
    if (this.answer.invalid ) return;
    const answer = {
      answer: this.answer.value,
      correct: false,
    };
    this.getAnswers.push(
      this.fb.control(answer, Validators.required)
    );
    console.log(this.answers);

    this.answer.reset();
  }
  public selectCorrect(answer: Answer) {
    answer.correct = !answer.correct;
  }

  public addDescription() {
    if (this.description.invalid ) {
      this.description.markAllAsTouched();
    } else {
      const description = this.description.value;
      this.getDescriptons.push(
        this.fb.control(description, Validators.required)
      );
      this.description.reset();
    }
  }

  public deleteDescription(index: number) {
    this.getDescriptons.removeAt(index);
  }



  public saveExam() {
    if (this.examForm.invalid) {
      this.examForm.markAllAsTouched();
    } else {

      console.log('this.examForm.value');
    }
    console.log(this.examForm.value);
  }


  public validateController(inputField: string) {
    return this.examForm.controls[inputField].errors
    && this.examForm.controls[inputField].touched;
  }
}
