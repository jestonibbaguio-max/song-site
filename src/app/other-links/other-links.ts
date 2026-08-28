import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-other-links',
  imports: [RouterModule, CommonModule, Navbar],
  templateUrl: './other-links.html',
  styleUrls: ['./other-links.css']
})
export class OtherLinks {

  links = [
    { text: 'Accenture Song', link: 'https://www.accenture.com/us-en/about/accenture-song-index'},
    { text: 'Accenture Support', link: 'https://support.accenture.com/'},
    { text: 'Buhay Accenture', link: 'https://in.accenture.com/philippines/'},
    { text: 'Information Security', link: 'https://in.accenture.com/protectingaccenture/dashboard/'},
    { text: 'MyTE: My Time and Expenses', link: 'https://myte.accenture.com/'},
    { text: 'PESH: Philippine Employee Self-Service Hub', link: 'https://employeehub-ph.accenture.com/#/home'},
    { text: 'Workday - ACBD Reflection', link: 'https://wd103.myworkday.com/accenture/d/task/2998$2739.htmld#TABTASKID=21200%2473'},
    { text: 'Workday - CV', link: 'https://wd103.myworkday.com/wday/authgwy/accenture/login.htmld?returnTo=%2faccenture%2fd%2fwday%2fapp%2fprintCVResume_qwsnhb%2fprintCVResume_qwsnhb.htmld'},
    { text: 'Workday - Skills and Specialization', link: 'https://skills.accenture.com/skills/experience'},
    { text: 'Workday Training', link: 'https://wd103.myworkday.com/accenture/learning?referrer=gmaportal'}
  ];

}
