import React from "react";
import Info from "../components/Info";

/* 
The home page displays only information about what the chapter is all about
and how to navigate the application.
*/

function Home() {
  return (
    <div className="main">
      <h1>Selbstkorrigierende Kodierungen</h1>
      <div className="space"></div>
      <div className="task">
        <p>
          Dies ist eine Webapplikation mit verschiedenen Aufgaben zum Thema
          Selbstkorrigierende Kodierungen. In diesem Thema lernen Sie Methoden
          kennen, um Fehler in Daten zu erkennen und gegebenenfalls sogar zu
          korrigieren.
        </p>
      </div>
      <div className="space"></div>
      <div className="task">
        <p>
          Über das Menü oben Links können einzelne Aufgaben direkt aufgerufen
          werden. Weiter können Sie mit den Pfeilen unten links zwischen den
          einzelnen Aufgaben hin und her blättern. Die meisten Aufgaben werden
          beim Öffnen der Seite neu generiert. Der Aufgabentyp bleibt immer
          derselbe, jedoch werden die Zahlenbeispiele jedes Mal neu gesetzt.
          Dies ermöglicht ein erneutes Lösen der Aufgaben.
        </p>
      </div>
      <div className="space"></div>
      <div className="task">
        <div className="taskLeft">
          <p>
            Einige Aufgaben haben folgende Symbole, welche Sie anklicken können.
          </p>
        </div>
        <div className="taskRight">
          <Info
            text={
              <p>
                Diese Hinweisboxen beinhalten einige Informationen, Hinweise
                oder Lösungen, die Ihnen beim Lösen der Aufgabe behilflich sein
                können.
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
