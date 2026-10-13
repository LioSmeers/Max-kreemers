(() => {
  const choices = document.querySelectorAll('[data-project]');
  const topics = {
    nieuwbouw: ['Een nieuwe woning', 'Vertel waar je bouwt en in welke fase je zit. Heb je al een grondplan? Stuur het gerust mee in je mail.', 'Mail Max over je nieuwbouw'],
    renovatie: ['Werken met wat er al ligt', 'Vertel welke ruimtes je verbouwt en wat je aan de elektriciteit wilt veranderen. Foto’s van de bestaande installatie zijn welkom.', 'Mail Max over je renovatie'],
    domotica: ['Wat wil je kunnen bedienen?', 'Vertel welke verlichting of rolluiken je wilt bedienen en hoe je dat nu doet. Zo kan ik meedenken over de mogelijkheden.', 'Mail Max over domotica']
  };
  choices.forEach(button => button.addEventListener('click', () => {
    choices.forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
    const topic = topics[button.dataset.project];
    document.querySelector('.guidance-title').textContent = topic[0];
    document.querySelector('.guidance-text').textContent = topic[1];
    const link = document.querySelector('.project-mail');
    link.textContent = topic[2];
    link.href = 'mailto:max@kreemerselektro.be?subject=' + encodeURIComponent('Mijn project: ' + button.dataset.project);
  }));
})();
