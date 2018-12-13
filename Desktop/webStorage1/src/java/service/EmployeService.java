package service;

import beans.Employe;
import java.util.List;
import org.hibernate.HibernateError;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import util.HibernateUtil;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author a
 */
public class EmployeService {

    public boolean create(List<Employe> emps) {
        Session session = null;
        Transaction tx = null;

        try {
            session = HibernateUtil.getSessionFactory().openSession();
            tx = session.beginTransaction();
            for (Employe e : emps) {
                session.save(e);
            }
            tx.commit();
            return true;
        } catch (HibernateException e) {
            if (tx != null) {
                tx.rollback();
            }
            return false;
        }
    }

}
