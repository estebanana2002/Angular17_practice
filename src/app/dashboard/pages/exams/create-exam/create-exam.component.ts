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
    'DGS',
    'DN',
    'MT',
    'GST',
  ];
  Subjects: string[] = [
    'Ingles',
    'Matematicas',
    'Science',
    'Desarrollo web'
  ];

  public question: FormControl = new FormControl('¿de que color es el azul?', Validators.required);
  public points: FormControl = new FormControl(5, Validators.required);
  public answer: FormControl = new FormControl('', Validators.required);
  public examForm!: FormGroup;

  public answers: Answer[] = [];

  constructor(
    private fb: FormBuilder,
  ) {
    this.examForm = fb.group({
      group: ['801', [Validators.required]],
      subject: ['Desarrollo web', [Validators.required]],
      title: ['Formularios reactivos', [Validators.required]],
      teacher: ['Erick Corro Pacheco', [Validators.required]],
      description: ['Examen parcial 1 de desarrollo web profesional', [Validators.required]],
      date: [new DatePipe('en-US').transform(new Date(), 'yyyy-MM-dd'), [Validators.required]],
      duration: [30, [Validators.required]],
      questions: this.fb.array([
        [{
          question: '¿Cuantos dedos tiene un cuyo?',
          points: 8,
          answer: fb.array([
            [{
                answer: '4',
                correct: false
              }, Validators.required],
            [{
                answer: '9',
                correct: false
              }, Validators.required],
            [{
                answer: '15',
                correct: true
              }, Validators.required],
          ]),
        }, Validators.required],
        [{
            question: '¿De dónde son los cuyos?',
            points: 8,
            answer: fb.array([
              [
                {
                  answer: 'Guatemala',
                  correct: false
                }, Validators.required
              ],
              [
                {
                  answer: 'México',
                  correct: false
                }, Validators.required
              ],
              [
                {
                  answer: 'Venezuela',
                  correct: false
                }, Validators.required
              ],
              [
                {
                  answer: 'Ninguna de las anteriores',
                  correct: true
                }, Validators.required
              ]
            ]),
          }, Validators.required],
      ]),
    });
    console.log(this.getQuestions);
  }

  public get getQuestions() {
    return this.examForm.get('questions') as FormArray;
  }


  public addQuestion() {
    if ( this.question.invalid ) return;
    const question = {
      question: this.question.value,
      points: this.points.value,
      answer: this.fb.array([... this.answers], Validators.required),
    };
    this.getQuestions.push(
      this.fb.control(question, Validators.required)
    );
    console.log(this.getQuestions);

    this.answers = [];
    this.question.reset();
    this.points.reset();
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
    this.answers.push(answer);
    console.log(this.answers);

    this.answer.reset();
  }

  public selectCorrect(answer: Answer) {
    answer.correct = !answer.correct;
  }
}
