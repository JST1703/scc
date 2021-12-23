import React from "react";

/* 
The home page displays only information about what the chapter is all about
and how to navigate the application.
*/

function Home() {
  return (
    <div className="home">
      <h1>Error-Correcting Codes</h1>

      <p>
        Computer kommunizieren mittels Codes. Die Codes sind eine Übersetzung
        von Informationen eines Nutzers, z.B. ein Text einer E-Mail, welche dann
        über Netzwerke von einem Computer zum nächsten gesendet wird. Diese
        Codes können leider Fehler beinhalten. Es kann sein, dass ein Nutzer
        einen Tippfehler macht, oder aber auch, dass beim Übermitteln sich der
        Code verfälscht, wegen eines technischen Fehlers. Je mehr Daten man
        senden will, desto höher ist die Wahrscheinlichkeit solcher Fehler.
      </p>

      <p>
        In diesem Kapitel lernen Sie Methoden kennen, wie man Fehler in
        einfachen Codes erkennen kann, und wie man diese zum Teil auch beheben
        kann. Sie finden links im Menu Aufgaben zu diesem Thema. Die Aufgaben
        bauen aufeinander auf. Deswegen empfiehlt es sich diese in der gegebenen
        Reihenfolge zu machen. Die Aufgaben werden beim Laden der Webseite neu
        gestaltet. Der Aufgabentyp bleibt der gleiche, jedoch wechseln die
        Beispiele, die Fragen und die entsprechenden Lösungen. Die Übungen
        können somit mehrfach gelöst werden, weil man nicht jedes Mal die genau
        gleichen Lösungen wiedergeben kann.
      </p>
    </div>
  );
}

export default Home;
