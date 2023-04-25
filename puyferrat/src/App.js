import React from 'react';
import './App.css';

// Composant Header
function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><a href="#overview">Aperçu</a></li>
          <li><a href="#history">Histoire</a></li>
          <li><a href="#gallery">Galerie</a></li>
        </ul>
      </nav>
    </header>
  );
}

// Composant Overview
function Overview() {
  return (
    <section id="overview">
      <h2>Aperçu</h2>
      <p>Le Château Puyferrat est un magnifique château situé en France. Construit au XVIIIe siècle, il a été récemment rénové et propose aujourd'hui des chambres d'hôtes de luxe.</p>
      <p>Le château est entouré de jardins magnifiques et offre une vue imprenable sur la vallée environnante. C'est l'endroit parfait pour une escapade romantique ou des vacances en famille.</p>
    </section>
  );
}

// Composant History
function History() {
  return (
    <section id="histoire">
      <h2>Histoire du Château Puyferrat</h2>
      <h3>Construction du château</h3>
      <p>
        Le Château Puyferrat est un château situé dans la région de la Nouvelle-Aquitaine, en France. Il a été construit au XVIIe siècle sur les vestiges d'un ancien château fort. La famille Puyferrat a été la première à posséder le château pendant plusieurs générations.
      </p>
      <h3>Achats et rénovations</h3>
      <p>
        En 1830, le château a été acheté par la famille de La Rochefoucauld, qui y a effectué des travaux de restauration importants. Les jardins ont été redessinés, le toit a été réparé et les intérieurs ont été remeublés avec des meubles anciens.
      </p>
      <h3>Occupation pendant la Seconde Guerre mondiale</h3>
      <p>
        Pendant l'occupation allemande pendant la Seconde Guerre mondiale, le château Puyferrat a été réquisitionné par les forces allemandes en 1940. Les occupants ont endommagé certains éléments du château, y compris les fenêtres et les portes, ainsi que les jardins. Les forces allemandes ont utilisé le château pour y installer un poste de commandement militaire, qui était responsable de la surveillance de la région environnante.
        Pendant cette période, la vie dans le château a été très difficile pour les occupants et les habitants locaux. Les propriétaires du château ont été forcés de quitter leur maison, et les habitants locaux ont été confrontés à des difficultés économiques et à des restrictions de liberté. Malgré ces difficultés, il y a eu des actes de résistance dans la région, et certains résistants ont utilisé le château comme base pour mener des actions contre l'occupation allemande.
        Après la guerre, le château a été abandonné pendant plusieurs années et a subi de nombreux dommages supplémentaires. Cependant, grâce à la passion d'un nouveau propriétaire qui a entrepris une grande restauration du bâtiment et des jardins, le château a été sauvé de la ruine et est aujourd'hui un site historique important de la région de la Nouvelle-Aquitaine.
      </p>
      <h3>Restauration et ouverture au public</h3>
      <p>
        Après avoir été abandonné pendant plusieurs années et avoir subi des dommages considérables, le château Puyferrat a été acheté par un nouveau propriétaire passionné qui a entrepris une grande restauration du bâtiment et des jardins. Les travaux de restauration ont été entrepris avec soin pour préserver l'authenticité du château tout en le rendant sûr et accueillant pour les visiteurs.
        Les travaux de restauration ont pris plusieurs années et ont coûté une somme considérable d'argent, mais ils ont finalement permis de sauver le château de la ruine et de le restaurer dans toute sa splendeur. Aujourd'hui, le château Puyferrat est ouvert au public et propose des visites guidées du bâtiment, des jardins et des expositions.
        Les visiteurs peuvent explorer les salles historiques du château, qui ont été restaurées avec soin pour refléter l'époque de sa construction et de son utilisation au fil des siècles. Les jardins ont également été soigneusement restaurés et offrent un cadre magnifique pour se promener et se détendre.
        En plus des visites guidées, le château Puyferrat est également utilisé pour des événements spéciaux tels que des mariages, des concerts et des expositions d'art. Cela aide à financer la maintenance continue du château et à soutenir son rôle en tant que site historique important de la région de la Nouvelle-Aquitaine.
      </p>
    </section>
  );
}


// Composant Gallery
function Gallery() {
  return (
    <section id="gallery">
      <h2>Galerie</h2>
      <div className="gallery">
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Saint-Astier_%28Dordogne%29_Puyferrat_%283%29.JPG" alt="Château Puyferrat" />
        <img src="https://www.chateau-fort-manoir-chateau.eu/image/chateau-de-puy-ferrat-24_e.JPG" alt="Château Puyferrat" />
        <img src="https://media.abcsalles.com/images/1/salles/900h/21620/chateau-puyferrat-15.jpg" alt="Château Puyferrat" />
        <img src="https://www.chateau-fort-manoir-chateau.eu/image/chateau-de-puy-ferrat-24_h.JPG" alt="Château Puyferrat" />
      </div>
    </section>
  );
}

// Composant Footer
function Footer() {
  return (
    <footer>
      <p>© 2023 Château Puyferrat - Tous droits réserver</p>
    </footer>
  );
}

// Composant principal App
function App() {
  return (
    <div>
      <Header />
      <Overview />
      <History />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;

