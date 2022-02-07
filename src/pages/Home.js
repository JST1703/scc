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
        Computer sprechen eine eigene Sprache. Diese Sprache ist Binär,
        bestehend aus Folgen von Einsen und Nullen. Dahinter versteckt sich
        jedoch eine Sprache, welche genauso komplex ist, wie die Sprache der
        Menschen. Alles, was Sie im Computer absprechen, übersetzt, dieser in
        eine binäre Folge. Das können Texte sein, z.B. von E-Mails, oder auch
        Binder. Der Computer kann diese binären Folgen verstehen und sie in das
        übersetzen, was der Mensch verstehen kann. Ein sehr einfaches Beispiel
        ist die ASCII Kodierung, welche jedem Buchstaben aus dem Alphabet eine
        Nummer zuweist und so eine direkte Übersetzung hat.
      </p>

      <p>
        Computer kommunizieren untereinander sehr oft untereinander, z.b. wenn
        Sie eine E-Mail versenden, und das auch nur in Binär. Diese Daten,
        welche man versendet, sind nichts anderes als elektrische Signale. Diese
        kann man unterschiedlich entwerfen. Vereinfacht kann man sagen, dass 1
        ein angeschaltetes Signal ist, etwas, was eine elektrische Spannung
        besitzt, und 0 ein ausgeschaltetes Signal ist, etwas, was keine
        elektrische Spannung besitzt. Beim Senden von Daten versendet man diese
        Signale, welche vom anderen Computer aufgenommen werden. Dieser Vorgang
        ist nicht perfekt und oft kommt es vor, dass diese Signale durch
        technische Fehler nicht richtig versendet werden. Eine 1 kann sich bei
        der Übertragung spontan in eine 0 umwandeln oder andersrum. Es kann auch
        sein, dass der Mensch ein Fehler macht, z.B. sich vertippt. Beide Fehler
        kommen häufig vor. Je mehr Daten man versendet, desto höher ist auch die
        Wahrscheinlichkeit eines Fehlers.
      </p>

      <p>
        In diesem Kapitel lernen Sie Methoden kennen, um Fehler in Daten
        erkennen und zum Teil auch direkt korrigieren können. Dazu haben sie
        hier einige Aufgaben. Diese können Sie über das Menü oben Links direkt
        öffnen, oder mit den Pfeilen Links zwischen den einzelnen Aufgaben hin
        und her blättern. Aufgaben werden jeweils neu geladen, zum Teil auch mit
        anderen Zahlenbeispielen und Aufgabestellungen, wenn Sie die Seite neu
        laden, oder wenn Sie eine Aufgabe wechseln.
      </p>
    </div>
  );
}

export default Home;
