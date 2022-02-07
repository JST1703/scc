import React from "react";

/* 
The home page displays only information about what the chapter is all about
and how to navigate the application.
*/

function Home() {
  return (
    <div className="home">
      <h1>Selbstkorrigierende Kodierungen</h1>

      <p>
        Computer kommunizieren mittels Codes. Die Codes sind eine Übersetzung
        von Informationen eines Nutzers, z.B. ein Text einer E-Mail, welche dann
        über Netzwerke von einem Computer zum nächsten gesendet wird. Diese
        Codes können leider Fehler beinhalten. Es kann sein, dass ein Nutzer
        einen Tippfehler macht, oder aber auch, dass beim Übermitteln sich der
        Code verfälscht, wegen eines technischen Fehlers. Je mehr Daten man
        senden will, desto höher ist die Wahrscheinlichkeit solcher Fehler.
        Fehler sind unumgänglich. Deswegen hat man verschiedene Methoden
        entwickelt um solche Fehler zu entdecken, oder sogar korrigieren zu
        können.
      </p>

      <p>
        In diesem Kapitel lernen Sie Methoden kennen, wie man Fehler in
        einfachen Codes erkennen kann, und wie man diese zum Teil auch behebt.
        Sie finden links im Menu Aufgaben zu diesem Thema und Sie können auch
        über die Navigationspfeile links die Aufgaben wechseln. Die Aufgaben
        bauen aufeinander auf. Deswegen empfiehlt es sich, diese in der
        gegebenen Reihenfolge zu lösen. Die Aufgaben werden beim Laden der
        Webseite neu gestaltet. Der Aufgabentyp bleibt der gleiche, jedoch
        wechseln die Beispiele, die Fragen und die entsprechenden Lösungen. Die
        Übungen können somit mehrfach gelöst werden.
      </p>
    </div>
  );
}

export default Home;