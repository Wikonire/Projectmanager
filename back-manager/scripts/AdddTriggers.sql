create function update_phase_progress() returns trigger
    language plpgsql
as
$$
BEGIN
    -- Aktualisiere den progress-Wert der zugehörigen Phase basierend auf dem Durchschnitt der Aktivitäten
    UPDATE project_phase
    SET progress = COALESCE((
                                SELECT ROUND(AVG(progress))
                                FROM activity
                                WHERE phase_id = NEW.phase_id
                            ), 0)  -- Falls keine Aktivitäten existieren, setze progress auf 0
    WHERE id = NEW.phase_id;

    RETURN NEW;
END;
$$;

alter function update_phase_progress() owner to postgres;

