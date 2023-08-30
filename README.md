# Memory Game
A memory game introduces a distinct challenge by tasking players with memorizing the placements of hidden cards. At the outset, the cards are briefly exposed before being concealed once again. Players must rely on their memory to unveil the cards in the accurate numerical order. Victory in this game is achieved by successfully progressing through all 20 levels.

![Responsive website on different devices](./README/images/responsive.png)

## Planning & Development
- __Target audience__
  - Individuals interested in enhancing their memory capabilities.
  - Those in search of engaging and challenging activities.
  - Individuals seeking friendly competition while playing a memory game.

- __Site Objectives__
  - Memory-Enhancing Gameplay: The website's key feature should revolve around a game specifically designed to improve memory skills.
  - User-Friendly Interface: The website's design and functionality should prioritize user-friendliness, enabling easy navigation and interaction.
  - Engagement-Centric Design: The website's presentation should be carefully designed to effectively captivate and engage users.

- __User story__
  - Intuitive Interaction: As a user, I anticipate that the website will offer easy and intuitive interaction.
  - Captivating Experience: In my user role, I look forward to an engaging and immersive game that effectively captures my attention and keeps me intrigued.
  - Skill Development: As a user, I aim to use this game as a practical tool to enhance my memory skills.
  - Demanding Challenge: In my user role, I expect the game to provide a significant level of challenge, pushing my abilities and ensuring long-lasting engagement.

- __Wireframes__
  - The game has been designed with responsiveness in mind, ensuring seamless gameplay across various devices including mobile phones, tablets, and desktop computers. Essential indicators will be prominently displayed at the top, providing key information to players. Meanwhile, at the bottom of the interface, a "Start" button will be positioned, enabling players to initiate the game with ease. The board game will be positioned at the center.

  <br>
  <details><summary>Mobile wireframe</summary>

    ![Mobile wireframe](./README/wireframes/mobile.png)

  </details>
  <details><summary>Ipad wireframe</summary>

    ![Ipad wireframe](./README/wireframes/ipad.png)
    
  </details>
  <details><summary>Desktop wireframe</summary>

    ![Desktop wireframe](./README/wireframes/desktop.png)

  </details>
  
- __Fonts__
- During the project planning phase, the primary objective was to enhance the user experience and provide maximum enjoyment. Regarding font selection, the choice was made to utilize the Nunito Sans font.

  - Nunito Sans

- __Colors__
- The color palette selection was a deliberate and meticulous process with the intention of creating an atmosphere of simplicity and comfort for all viewers. The primary hue of dark blue was chosen as the foundational shade, accompanied by the contrasting and vibrant yellow. Moreover, the palette includes several other colors.

  - main color: #002855;
  - main contrast color: #ffff00;
  - wrong color: #e3d44c;
  - text color: #e3d44c;
  - dark color: #000000;
  - light color: #ffffff;

- __Technologies__
  - JavaScript
  - DOM
  - Local Storage
  - HTML
  - CSS

## Features

### Responsiveness
In both the mobile and desktop versions, the game board comprises 20 cards. These cards fill the entire board, which spans the space between the indicator bar and the control bar. However, it's important to mention that the desktop version displays the board and cards in a slightly different layout and proportion, taking up less space. This customized design guarantees an optimal experience across various devices.

<details><summary>The image illustrates the website displayed on various devices.</summary>

  ![Responsive website on different devices](./README/images/responsive.png);
  
</details>


### Game Indicators
At the top of the screen, three indicators are displayed: Max Level, Level, and Tries.

  - The "Max Level" indicator indicates the highest level you have achieved in the game. Importantly, your progress is automatically saved by the browser. Whenever you return to the game, your recorded achievement is prominently shown in the "Max Level" column, providing a convenient method to monitor your accomplishments.
  - The "Level" indicator provides an overview of your current progress in the game. Each time you correctly identify the necessary cards, you advance to the next level. As you continue, the game's complexity increases proportionally. The number of cards you need to uncover corresponds to your current level. For instance, at level 6, you will need to uncover 6 cards. It's important to note that the game's maximum level you can pass is level 20.
  - The "Tries" indicator shows the number of allowable mistakes you can make when selecting cards. Your initial number of attempts starts at zero. After successfully completing a level, your available tries increase by one. On the other hand, each time you select an incorrect card, your tally of tries decreases by one. If the total number of tries reaches zero and you choose an incorrect card, the game will conclude with a loss.

  ![Indication bar](./README/images/indication_bar.png)

### Game Board
  The game board comprises 20 cards, each displaying only their reverse side. When the game is started, a certain number of cards will be momentarily revealed according to the current level. The player's objective is to remember both the revealed cards and their sequence within this brief exposure time. Afterward, the player must choose these cards in ascending order, relying on their memory to accurately recreate the sequence.

  ![Open cards](./README/images/open_cards.png)

  Upon successfully selecting all the correct cards, they disappear from the board. In their stead, you are greeted with either a "Good Job" or "New Record" title, accompanied by a countdown timer positioned in the center of the board. Towards the bottom of the board, there exists a "Continue" button that presents you with the choice to proceed.

  ![Record](./README/images/record.png)

  At this point, you have various options: you can wait for the countdown to expire before starting the next level, press the "Continue" button to proceed, close the tab to exit the game, or reload the page. If you decide to reload the page, close the tab, or exit the browser your progress will be saved. When you come back to the game, you will see your current level title on the board and a button to continue.

  ![Continue board](./README/images/continue.png)

### Controls (Start button)

## Testing 

### Validator Testing 
- __W3C HTML Validator__
  - The index.html file has been validated using the W3C HTML Validator, with no errors or warnings found.

<details><summary>Validated code image (HTML Validator)</summary>

  ![W3C HTML Validator](./README/validators/html.png);
  
</details>
<br>

- __W3C CSS Validator (Jigsaw)__
  - The CSS code has been validated using the W3C CSS Validator (Jigsaw), and no errors were found.

<details><summary>Validated code image (CSS Validator)</summary>

  ![W3C CSS Validator (Jigsaw)](./README/validators/css.png);
  
</details>
<br>

  - The only warning that was found pertains to the imported Google font, which is an external link and therefore cannot be validated.

<details><summary>Warning image (CSS Validator)</summary>

  ![W3C CSS Validator Warning](./README/validators/css_warning.png);
  
</details>
<br>

- __JSHint JavaScript Validator__
  - The JavaScript file has been validated using the JSHint JavaScript Validator, and no errors were detected. However, several warnings were identified, primarily related to the usage of ES6 features, such as arrow functions, let, and const.

<details><summary>Validated code image (JS Validator)</summary>

  ![JSHint JavaScript Validator](./README/validators/js.png);

</details>

### Lighthouse
The Lighthouse reports exhibit outstanding results across all categories. SEO, Best Practices, and Accessibility have all achieved a flawless 100% score on both mobile and desktop platforms. Furthermore, Performance scores are commendable, with a score of 99 for desktop and a 95 for mobile. These outcomes underscore the website's quality and optimization.
<br>
<details><summary>Lighthouse report for mobile</summary>

  ![Mobile lighthouse report](./README/lighthouse/mobile.png)
  
</details>
<details><summary>Lighthouse report for desktop</summary>

  ![Desktop lighthouse report](./README/lighthouse/desktop.png)

</details>

### Manual Testing

### Unfixed Bugs

### Fixed Bugs

### Test against userstories

## Deployment
- __The site has been deployed to GitHub Pages. The deployment process involves the following steps:__
    - Navigate to the Settings tab within this project's repository.
    - Select 'Pages' from the left-hand menu.
    - From the 'Source' section drop-down menu, choose the main branch.
    - After saving the main branch a link to the live project will be provided.

The link to the live project - https://oleksiyla.github.io/Project_2/

## Credits

### Content
- The Nunito Sans fonts were obtained from Google Fonts: https://fonts.google.com

### Media
- All SVG icons, including the favicon, were sourced from FontAwesome: https://fontawesome.com