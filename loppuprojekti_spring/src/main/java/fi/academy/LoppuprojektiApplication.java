package fi.academy;

import fi.academy.paino.Paino;
import fi.academy.paino.PainoRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class LoppuprojektiApplication {

	@Autowired
	PainoRepo pr;

	public static void main(String[] args) {
		SpringApplication.run(LoppuprojektiApplication.class, args);
	}


//	Väliaikesn tietokannan käyttöön luotua dataa ja CommandlineRunner by Heidi Ja Elina
	@Bean
	public CommandLineRunner koira() {
		return (args) -> {
			Paino eka = new Paino(1, LocalDate.of(2018, 2, 2), 75);
			Paino toka = new Paino(2, LocalDate.of(2018, 3, 15), 80);
			Paino kolmas = new Paino(1, LocalDate.of(2018, 4, 1), 72);
			Paino neljas = new Paino(2, LocalDate.of(2018, 4, 5), 79);
			Paino viides = new Paino(1, LocalDate.of(2018, 3, 31), 70);
			Paino kuudes = new Paino(2, LocalDate.of(2018, 3, 12), 74);

			pr.save(eka);
			pr.save(toka);
			pr.save(kolmas);
			pr.save(neljas);
			pr.save(viides);
			pr.save(kuudes);
		} ;
	}
}

