import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.page.html',
  styleUrls: ['./premium.page.scss'],
})
export class PremiumPage implements OnInit {
  allPlans = [
    {
      cardHead: 'Popular Plan',
      planName: 'Standard',
      planRate: 1499,
      users: 101,
      features: [
        {
          feature: 'Unlock Premium profile',
          accessible: true,
        },
        {
          feature: 'Callback within 24 hours',
          accessible: true,
        },
        {
          feature: 'Meet offline in centre',
          accessible: true,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
        {
          feature: 'Customer Support',
          accessible: false,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
      ],
    },
    {
      cardHead: 'Popular Plan',
      planName: 'Standard',
      planRate: 1499,
      users: 101,
      features: [
        {
          feature: 'Unlock Premium profile',
          accessible: true,
        },
        {
          feature: 'Callback within 24 hours',
          accessible: true,
        },
        {
          feature: 'Meet offline in centre',
          accessible: true,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
        {
          feature: 'Customer Support',
          accessible: false,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
      ],
    },
    {
      cardHead: 'Popular Plan',
      planName: 'Standard',
      planRate: 1499,
      users: 101,
      features: [
        {
          feature: 'Unlock Premium profile',
          accessible: true,
        },
        {
          feature: 'Callback within 24 hours',
          accessible: true,
        },
        {
          feature: 'Meet offline in centre',
          accessible: true,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
        {
          feature: 'Customer Support',
          accessible: false,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
      ],
    },
    {
      cardHead: 'Popular Plan',
      planName: 'Standard',
      planRate: 1499,
      users: 101,
      features: [
        {
          feature: 'Unlock Premium profile',
          accessible: true,
        },
        {
          feature: 'Callback within 24 hours',
          accessible: true,
        },
        {
          feature: 'Meet offline in centre',
          accessible: true,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
        {
          feature: 'Customer Support',
          accessible: false,
        },
        {
          feature: 'lorem ipsum',
          accessible: false,
        },
      ],
    },
  ];

  faqs = [
    {
      question: 'How does the offline meeting feature work?',
      answer:
        'Users can connect with others for offline meetings through the app by following simple guidelines and requirements set by the app',
      showAnswer: false,
    },
    {
      question: 'Can I talk to the app owner or members foir assistance?',
      answer: 'Answer 2',
      showAnswer: false,
    },
    {
      question: "How do I schedule an offline meeting at the company's centre?",
      answer: 'Answer 3',
      showAnswer: false,
    },
  ];

  constructor() {}

  ngOnInit() {}

  toggleAnswer(faq: any) {
    faq.showAnswer = !faq.showAnswer;
  }
}
