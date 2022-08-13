let content;

function emptyContent() {
    content = document.getElementById('content-dynamic');
    content.innerHTML = '';
}


/**
 * renders board as start page und updates it's contents.
 */

function showBoard() {
    emptyContent();
    content.innerHTML = `
    <div class="content" id="content">
        <div class="todo">
            <span>TO DO</span>
            <div class="todo-container" id="todo" ondrop="moveTo('Management')" ondragover="allowDrop(event)">

            </div>
        </div>
        <div class="todo">
            <span>IN PROGRESS</span>
            <div class="todo-container in-progress" id="in-progress" ondrop="moveTo('IT')" ondragover="allowDrop(event)">

            </div>
        </div>
        <div class="todo">
            <span>TESTING</span>
            <div class="todo-container testing" id="testing" ondrop="moveTo('Design')" ondragover="allowDrop(event)">

            </div>
        </div>
        <div class="todo">
            <span>DONE</span>
            <div class="todo-container done" id="done" ondrop="moveTo('Product')" ondragover="allowDrop(event)">

            <!-- highlight('sale')" ondragleave="removeHighlight('sale') -->

            </div>
        </div>
    </div>
`;
    updateBoard();
}


/**
 * renders backlog as registry tracker for all activities on board and updates it's contents.
 */

async function showBacklog() {
    await loadTasksBacklog();
    emptyContent();
    content.innerHTML += `
    <div class="backlog">
        <div class="backlog-top">
            <div class="backlog-headline">
                <h2>Backlog</h2>
                <span>Learning Management System Project</span>
            </div>
            <div class="titles">
                <span>ASSIGNED TO</span>
                <span class="category">CATEGORY</span>
                <span class="details">DETAILS</span>
            </div>
        </div>

        <div class="backlog-bottom" id="backlog-bottom">
           
        </div>
    </div>
    `;
    showBacklogBottom();
}


/**
 * with nested for loops renders added tasks from tasksInBacklog array at the bottm of backlog page in normal and responsive views. 
 */

function showBacklogBottom() {
    for (let i = 0; i < tasksInBacklog.length; i++) {
        const task = tasksInBacklog[i];

        let backlogBottom = document.getElementById('backlog-bottom');
        // backlogBottom.innerHTML = '';
        backlogBottom.innerHTML += `
    <div class="backlog-normal-view">
        <div class="pic-and-name" id="pic-and-name">
            <div class="img-and-name-email">
                <img id="e-img${i}" src="" alt="">
                <div class="name-and-email">
                    <span id="e-name${i}"></span>
                    <span id="e-email${i}" class="email"></span>
                </div>
            </div>
            <div class="category1">${task.category}</div>
            <div class="description-and-delete">
                <img onclick="deleteTaskBacklog(${task['id']})" class="delete" src="./img/delete.ico" alt=""> 
                <div class="description">${task.description}</div>
            </div>
        </div>
    </div>

    <div class="backlog-responsiv d-none">
    <div class="pic-and-name-r" id="pic-and-name">
        <div class="r-top">
            <span class="title-responsive">ASSIGNED TO</span>
            <div class="img-and-name-email-r">
                <img id="e-img-r${i}"  alt="">
                <div class="name-and-email-r">
                    <span id="e-name-r${i}"></span>
                    <span id="e-email-r${i}" class="email"></span>
                </div>
            </div>
        </div>

        <div class="r-middle">
            <span class="title-responsive">CATEGORY</span>
            <div class="category1">${task.category}</div>
        </div>

        <div class="r-bottom">
            <span class="details-r title-responsive">DETAILS</span>
            <div class="description-and-delete-r">
                <img onclick="deleteTaskBacklog(${task['id']})" class="delete" src="./img/delete.ico" alt="">
                <div class="description-r">${task.description}</div>
            </div>
        </div>
    </div>
</div>
        `;
        let eImg = document.getElementById(`e-img${i}`);
        let eName = document.getElementById(`e-name${i}`);
        let eEmail = document.getElementById(`e-email${i}`);

        let eImgR = document.getElementById(`e-img-r${i}`);
        let eNameR = document.getElementById(`e-name-r${i}`);
        let eEmailR = document.getElementById(`e-email-r${i}`);



        for (let j = 0; j < task['employee'].length; j++) {
            const element = task['employee'][j];
            eImg.src = `./img/${element.pic}`;
            eName.innerHTML += `${element.name}`;
            eEmail.innerHTML += `${element.email}`;

            eImgR.src += `./img/${element.pic}`;
            eNameR.innerHTML += `${element.name}`;
            eEmailR.innerHTML += `${element.email}`;
        }
        // renderEmployeeBacklog();
    }
}


// function renderEmployeeBacklog() {

//     let eImg = document.getElementById(`e-img${i}`);
//     let eName = document.getElementById(`e-name${i}`);
//     let eEmail = document.getElementById(`e-email${i}`);

//     let eImgR = document.getElementById(`e-img-r${i}`);
//     let eNameR = document.getElementById(`e-name-r${i}`);
//     let eEmailR = document.getElementById(`e-email-r${i}`);



//     for (let j = 0; j < task['employee'].length; j++) {
//         const element = task['employee'][j];
//         eImg.src += `./img/${element.pic}`;
//         eName.innerHTML += `${element.name}`;
//         eEmail.innerHTML += `${element.email}`;

//         eImgR.src += `./img/${element.pic}`;
//         eNameR.innerHTML += `${element.name}`;
//         eEmailR.innerHTML += `${element.email}`;
//     }
// }


/**
 * renders add task page and visualize assigned employees.
 */

function addTask() {
    emptyContent();
    content.innerHTML = `
    <div class="add-task">
        <div class="title">
            <span>Add Task</span>
            <p class="">Learning Management System Project</p>
        </div>

        <form onsubmit="addNewTask();return false" class="form">
            <div class="d-flex">
             <div class="form-title m-right-50 dflex-col">
                    <label>TITLE</label>
                    <input id="title" required class="input-inner input-width input-top-m" type="text" placeholder="Management Meeting Preparation">
                </div>
                <div class="form-date dflex-col">
                    <label>DUE DATE</label>
                    <input id="date" required class="input-inner input-width input-top-m " type="date">
                </div>
            </div>
            <div class="d-flex">
                <div class="form-title dflex-col m-right-50">
                    <label>CATAGORY</label>
                    <select id="category" class="input-width input-top-m" required>
                        <option value="" selected>None</option>    
                        <option value="Management">Management</option>
                        <option value="IT">IT</option>
                        <option value="Design">Design</option>
                        <option value="Product">Product</option>
                    </select>
                </div>
                <div class="form-date dflex-col">
                    <label>URGENCY</label>
                    <select id="urgency" class="input-width input-top-m" required>
                        <option value="" selected>None</option>        
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>
            <div class="d-flex">
                <div class="form-title dflex-col m-right-50">
                    <label>DESCRIPTION</label>
                    <textarea id="description" required class="input-inner input-width input-top-m" name="" id="" cols="30" rows="10"></textarea>
                </div>
                <div class="form-date input-width">
                <label>ASSIGNED TO</label>

                    <div class="assignedto-pic ">
                        <div id="avatar" class="avatar-container">

                        </div>
                        <div class="btns">
                            <span onclick="reset()">Cancel</span>
                            <button type="submit">CREATE TASK</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    `;
    let avatar = document.getElementById('avatar');
    avatar.innerHTML = '';
    for (let j = 0; j < employee.length; j++) {
        const user = employee[j];

        avatar.innerHTML += `<img onclick="selectUser(${j})" id="user-${j}" src="./img/${user.pic}" class="avatar">`;
    }
}


function showHelp() {
    emptyContent();
    content.innerHTML = `
    <div class="help">
        <div class="help-title">
            <h2>Join</h2>
            <span>Learning Management System Project</span>
            <p>
                A kanban board is an agile project management tool designed to help visualize work, limit work-in-progress, and maximize efficiency (or flow). It can help both agile and DevOps teams establish order in their daily work. Kanban boards use cards, columns, and continuous improvement to help technology and service teams commit to the right amount of work, and get it done!            </p>
        </div>
        <div class="help-board">
            <h2>BOARD</h2>
            <div class="h-board">
                <p>
                    Here you can get an overview of all your tasks at a glance with everything view. You can simply drag and drop tasks between the four sections, the background will change accordingly. When a task is done, you can simply delete it form the board by clicking on delete button. For tracking purposes you can always find a copy of the deleted task in backlog.
                </p>
                <img src="./img/g.png" alt="">
            </div>
        </div>

        <div class="help-backlog">
            <h2>Backlog</h2>
            <div class="h-backlog">
                <img src="./img/ggg.png" alt="">
                <p>
                    Backlog is used as a registry for all added tasks. You can always refer to the backlog to see, which task was when and by whome created. To not lose the overview and work flowly, any deleted task form board could be find in backlog, unless you decide to delete them from backlog too.
                </p>
            </div>
        </div>

        <div class="help-add-task">
            <h2>Add Task</h2>
            <div class="h-add-task">
                <p>
                    You can add a task by filling all the input fields and clicking the create button.You will need to fill the title of task, the date, category, urgency and description and assign it to your team member. The created task can you find on board or in backlog.
                </p>
                <img src="./img/ggg.png" alt="">
            </div>
        </div>
</div>`;
}


/**
 * renders imprint
 */

function showImpressum() {
    emptyContent();
    content.innerHTML = `
    <div class="imprint">
    <div class='impressum'><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p><p>Masihullah Massudi <br> 
    Juri-Gagarin-Ring 128<br> 
    99084 Erfurt <br> 
    </p><p><strong>Kontakt:</strong> <br>
    Telefon: 0157-59740985<br>
    E-Mail: <a href='masihullahmassudi84@gmail.com'>masihullahmassudi84@gmail.com</a></br></p>
    <br><strong>Haftung für Inhalte</strong><br><br>
    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.<br><br><strong>Haftung für Links</strong><br><br>
    Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.<br><br><strong>Urheberrecht</strong><br><br>
    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.<br><br><strong>Datenschutz</strong><br><br>
    Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. <br>
    Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich. <br>
    Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.<br>
    <br><br><strong>Google Analytics</strong><br><br>
    Diese Website benutzt Google Analytics, einen Webanalysedienst der Google Inc. (''Google''). Google Analytics verwendet sog. ''Cookies'', Textdateien, die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) wird an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um Reports über die Websiteaktivitäten für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Sie können die Installation der Cookies durch eine entsprechende Einstellung Ihrer Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.<br><br><strong>Google AdSense</strong><br><br>
    Diese Website benutzt Google Adsense, einen Webanzeigendienst der Google Inc., USA (''Google''). Google Adsense verwendet sog. ''Cookies'' (Textdateien), die auf Ihrem Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie ermöglicht. Google Adsense verwendet auch sog. ''Web Beacons'' (kleine unsichtbare Grafiken) zur Sammlung von Informationen. Durch die Verwendung des Web Beacons können einfache Aktionen wie der Besucherverkehr auf der Webseite aufgezeichnet und gesammelt werden. Die durch den Cookie und/oder Web Beacon erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer IP-Adresse) werden an einen Server von Google in den USA übertragen und dort gespeichert. Google wird diese Informationen benutzen, um Ihre Nutzung der Website im Hinblick auf die Anzeigen auszuwerten, um Reports über die Websiteaktivitäten und Anzeigen für die Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der Internetnutzung verbundene Dienstleistungen zu erbringen. Auch wird Google diese Informationen gegebenenfalls an Dritte übertragen, sofern dies gesetzlich vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Google verarbeiten. Google wird in keinem Fall Ihre IP-Adresse mit anderen Daten der Google in Verbindung bringen. Das Speichern von Cookies auf Ihrer Festplatte und die Anzeige von Web Beacons können Sie verhindern, indem Sie in Ihren Browser-Einstellungen ''keine Cookies akzeptieren'' wählen (Im MS Internet-Explorer unter ''Extras > Internetoptionen > Datenschutz > Einstellung''; im Firefox unter ''Extras > Einstellungen > Datenschutz > Cookies''); wir weisen Sie jedoch darauf hin, dass Sie in diesem Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der über Sie erhobenen Daten durch Google in der zuvor beschriebenen Art und Weise und zu dem zuvor benannten Zweck einverstanden.</p><br> 
    Website Impressum von <a href="https://www.impressum-generator.de">impressum-generator.de</a>
    </div>
    </div>
`;
}


/**
 * renders privacy policy
 */

function showPrivacy() {
    emptyContent();
    content.innerHTML = `
    <div class="privacy">
    <h1>Privacy Policy</h1>
    <p>Last updated: August 12, 2022</p>
    <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
    <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the <a href="https://www.freeprivacypolicy.com/free-privacy-policy-generator/" target="_blank">Free Privacy Policy Generator</a>.</p>
    <h1>Interpretation and Definitions</h1>
    <h2>Interpretation</h2>
    <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
    <h2>Definitions</h2>
    <p>For the purposes of this Privacy Policy:</p>
    <ul>
    <li>
    <p><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</p>
    </li>
    <li>
    <p><strong>Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where &quot;control&quot; means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>
    </li>
    <li>
    <p><strong>Application</strong> means the software program provided by the Company downloaded by You on any electronic device, named Join Learning Management System Project</p>
    </li>
    <li>
    <p><strong>Company</strong> (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Agreement) refers to Join Learning Management System Project.</p>
    </li>
    <li>
    <p><strong>Country</strong> refers to: Thuringia,  Germany</p>
    </li>
    <li>
    <p><strong>Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>
    </li>
    <li>
    <p><strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.</p>
    </li>
    <li>
    <p><strong>Service</strong> refers to the Application.</p>
    </li>
    <li>
    <p><strong>Service Provider</strong> means any natural or legal person who processes the data on behalf of the Company. It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>
    </li>
    <li>
    <p><strong>Usage Data</strong> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>
    </li>
    <li>
    <p><strong>You</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
    </li>
    </ul>
    <h1>Collecting and Using Your Personal Data</h1>
    <h2>Types of Data Collected</h2>
    <h3>Personal Data</h3>
    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:</p>
    <ul>
    <li>
    <p>Email address</p>
    </li>
    <li>
    <p>First name and last name</p>
    </li>
    <li>
    <p>Usage Data</p>
    </li>
    </ul>
    <h3>Usage Data</h3>
    <p>Usage Data is collected automatically when using the Service.</p>
    <p>Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
    <p>When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.</p>
    <p>We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.</p>
    <h2>Use of Your Personal Data</h2>
    <p>The Company may use Personal Data for the following purposes:</p>
    <ul>
    <li>
    <p><strong>To provide and maintain our Service</strong>, including to monitor the usage of our Service.</p>
    </li>
    <li>
    <p><strong>To manage Your Account:</strong> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.</p>
    </li>
    <li>
    <p><strong>For the performance of a contract:</strong> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.</p>
    </li>
    <li>
    <p><strong>To contact You:</strong> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.</p>
    </li>
    <li>
    <p><strong>To provide You</strong> with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.</p>
    </li>
    <li>
    <p><strong>To manage Your requests:</strong> To attend and manage Your requests to Us.</p>
    </li>
    <li>
    <p><strong>For business transfers:</strong> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.</p>
    </li>
    <li>
    <p><strong>For other purposes</strong>: We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.</p>
    </li>
    </ul>
    <p>We may share Your personal information in the following situations:</p>
    <ul>
    <li><strong>With Service Providers:</strong> We may share Your personal information with Service Providers to monitor and analyze the use of our Service,  to contact You.</li>
    <li><strong>For business transfers:</strong> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.</li>
    <li><strong>With Affiliates:</strong> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.</li>
    <li><strong>With business partners:</strong> We may share Your information with Our business partners to offer You certain products, services or promotions.</li>
    <li><strong>With other users:</strong> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.</li>
    <li><strong>With Your consent</strong>: We may disclose Your personal information for any other purpose with Your consent.</li>
    </ul>
    <h2>Retention of Your Personal Data</h2>
    <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
    <p>The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.</p>
    <h2>Transfer of Your Personal Data</h2>
    <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
    <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>
    <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>
    <h2>Disclosure of Your Personal Data</h2>
    <h3>Business Transactions</h3>
    <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
    <h3>Law enforcement</h3>
    <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
    <h3>Other legal requirements</h3>
    <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>
    <ul>
    <li>Comply with a legal obligation</li>
    <li>Protect and defend the rights or property of the Company</li>
    <li>Prevent or investigate possible wrongdoing in connection with the Service</li>
    <li>Protect the personal safety of Users of the Service or the public</li>
    <li>Protect against legal liability</li>
    </ul>
    <h2>Security of Your Personal Data</h2>
    <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
    <h1>Children's Privacy</h1>
    <p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent, We take steps to remove that information from Our servers.</p>
    <p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, We may require Your parent's consent before We collect and use that information.</p>
    <h1>Links to Other Websites</h1>
    <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
    <p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
    <h1>Changes to this Privacy Policy</h1>
    <p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>
    <p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the &quot;Last updated&quot; date at the top of this Privacy Policy.</p>
    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>
    <h1>Contact Us</h1>
    <p>If you have any questions about this Privacy Policy, You can contact us:</p>
    <ul>
    <li>By email: masihullahmassudi85@gmail.com</li>
    </ul>
    </div>
`;
}